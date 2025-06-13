import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
    // points to my credentials file
    keyFile: './config/credentials.json',

    // scopes for read-only access to Google Drive
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

export async function listFilesInFolder(folderId: string) {
  const res = await drive.files.list({

    // Use the folderId to filter files in that folder
    // I might not need this though because in the folder
    // it's only text files but this is just in case

    q: `'${folderId}' in parents and mimeType = 'application/pdf'`,
    fields: 'files(id, name)',
  });

  return res.data.files || [];
}

export async function downloadFile(fileId: string) {
  const res = await drive.files.get(
    {
      fileId,
      alt: 'media',
    },
    { responseType: 'stream' }
  );

  return new Promise<string>((resolve, reject) => {
    let data = '';
    res.data.on('data', (chunk) => {
      data += chunk;
    });
    res.data.on('end', () => {
      resolve(data);
    });
    res.data.on('error', reject);
  });
}