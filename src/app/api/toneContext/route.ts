import { NextResponse } from "next/server";
import { listFilesInFolder, downloadFile } from "@/app/lab/googleDrive";

export async function GET() {
    try {
        // Ensure the environment variable is set
        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID

        if (!folderId) {
            return NextResponse.json({ error: "Folder ID is not set in environment variables." });
        }
    

        const files = await listFilesInFolder(folderId);
        const contents: Record<string, string> = {};

        for (const file of files) {
            if (file.name != null && file.id != null) { // checks for both null and undefined
                const text = await downloadFile(file.id);
                contents[file.name] = text;
            }
        }
        return NextResponse.json({files: contents });

    } catch (error) {
        console.error("Error fetching files:", error);
        return NextResponse.json({ error: "Failed to fetch files." }, { status: 500 });
    }
}