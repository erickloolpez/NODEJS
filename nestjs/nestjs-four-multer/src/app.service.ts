import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {

  }
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
      const response = await axios.post('https://n8n.srv831273.hstgr.cloud/webhook-test/9552c142-3a97-4805-840a-28f3a04423b8', payload);
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

  async processEntry(
    data: {
      output: {
        palabras: { word: string; relation: string }[];
        history: string;
      };
    },
    id_usuario: number,
    id_diccionario: number,
    titulo_historia?: string
  ) {
    // Verificar si la estructura es correcta
    if (!data || !data.output || !data.output.palabras) {
      throw new Error(`Estructura de datos incorrecta. Se esperaba data.output.palabras`);
    }

    // 1. Guardar palabras
    const palabrasCreadas = await Promise.all(
      data.output.palabras.map((p) =>
        this.prisma.palabra.create({
          data: {
            palabra: p.word,
            relacion: p.relation,
            id_diccionario: id_diccionario,
          },
        })
      )
    );

    // 2. Guardar historia
    const historiaCreada = await this.prisma.historia.create({
      data: {
        id_usuario: id_usuario,
        id_diccionario: id_diccionario,
        titulo_historia: titulo_historia ?? null,
        historia: data.output.history,
      },
    });

    return {
      palabras: palabrasCreadas,
      historia: historiaCreada,
    };
  }
}
