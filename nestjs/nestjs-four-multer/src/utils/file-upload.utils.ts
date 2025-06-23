import { extname } from 'path';

export const cleanFileName = (fileName) => {
  const decodedFileName = decodeURIComponent(fileName);
  const name = decodedFileName.split('.')[0]
    .replace(/\s+/g, '-')                    // Reemplaza espacios por guiones
    .replace(/[^a-zA-Z0-9\-_]/g, '')         // Elimina caracteres especiales
    .replace(/-+/g, '-')                     // Reemplaza múltiples guiones por uno solo
    .replace(/^-|-$/g, '');                  // Elimina guiones al inicio y final
  return name;
};

export const editFileName = (req, file, callback) => {
  const cleanedName = cleanFileName(file.originalname);
  const fileExtName = extname(file.originalname);
  // const randomName = Array(8)
  //   .fill(null)
  //   .map(() => Math.floor(Math.random() * 10))
  //   .join('');
  callback(null, `${cleanedName}${fileExtName}`);
};