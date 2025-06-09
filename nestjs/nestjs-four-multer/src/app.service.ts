import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async processFileUpload(file: Express.Multer.File): Promise<any> {
    // Construir la URL pública del archivo
    const publicUrl = `http://localhost:3003/public/${file.filename}`;

    // Preparar el payload para n8n
    const payload = {
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      publicUrl,
      uploadedAt: new Date().toISOString(),
    };

    // Llamar al webhook de n8n
    try {
      const response = await axios.post('https://n8n.srv831273.hstgr.cloud/webhook-test/21862cfa-8f34-46b5-ad67-2a20b7b86c96', payload);
      console.log('Webhook de n8n llamado exitosamente:', response.status);
    } catch (error) {
      console.error('Error llamando al webhook de n8n:', error.message);
      // Aquí puedes decidir si quieres lanzar una excepción o solo loggear el error
    }

    return {
      message: 'File uploaded successfully',
      ...payload,
    };
  }
}
