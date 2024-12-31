import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
}
export const fetchDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET as string) as DecodedToken;
        return decodedToken.id;
        
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in Fetching Data from token:",error.message);
            throw new Error(error.message);
        } else {
            console.error("Unexpected error in Verify fetchDataFromToken Function:",error);
            throw new Error("unexpected error occurred while fetchingDataFromToken");
        }
    }

}