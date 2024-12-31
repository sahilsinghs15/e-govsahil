import { NextResponse } from "next/server";

const cookieOption : object = {
    secure : false,
    maxAge : 0,
    httpOnly : true,
}

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        })
        response.cookies.set("token", "",cookieOption);
        return response;
    }catch (error) {
        if (error instanceof Error) {
            console.error("Error in Logout:",error.message);
            throw new Error(error.message);
        } else {
            console.error("Unexpected error in Logout Function:",error);
            throw new Error("unexpected error occurred while Logout");
        }
    }
        
}