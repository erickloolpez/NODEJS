import { extname } from 'path';
import { existsSync, unlinkSync } from 'fs';

export const cleanFileName = (fileName: string) => {
  const decodedFileName = decodeURIComponent(fileName);
  const name = decodedFileName.split('.')[0]
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9\-_]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return name;
};

export const editFileName = (req, file, callback) => {
  const cleanedName = cleanFileName(file.originalname);
  const fileExtName = extname(file.originalname);
  const finalFileName = `${cleanedName}${fileExtName}`;
  const uploadPath = './uploads'; // Asegúrate que coincida con tu destino en Multer

  // Elimina el archivo existente si hay uno con el mismo nombre
  if (existsSync(`${uploadPath}/${finalFileName}`)) {
    unlinkSync(`${uploadPath}/${finalFileName}`);
  }

  callback(null, finalFileName);
};