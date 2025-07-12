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

    let responseWebhook = null

    // Llamar al webhook de n8n
    try {
      const response = await axios.post('https://n8n.srv831273.hstgr.cloud/webhook-test/9552c142-3a97-4805-840a-28f3a04423b8', payload);
      console.log('Webhook de n8n llamado exitosamente:', response.status);
      responseWebhook = response.data;
      console.log('Respuesta del webhook de n8n:', responseWebhook);
      return {
        message: 'File uploaded successfully',
        data: response.data,
      };
    } catch (error) {
      console.error('Error llamando al webhook de n8n:', error.message);
      return {
        message: 'Error al llamar al webhook de n8n',
      };
    }
  }

  async processEntry(
    data: {
      palabras: {
        word_id?: number;
        user_id?: number;
        word: string;
        relation: string;
        created_at?: string
      }[];
      historia: {
        story_details_id?: number;
        user_id?: number;
        title: string;
        story_text: string;
        character?: string;
        place?: string;
        created_at?: string;
        updated_at?: string;
      };
    },
    user_id: number
  ) {
    // Verificar si la estructura es correcta
    if (!data || !data.palabras || !data.historia) {
      throw new Error(`Estructura de datos incorrecta. Se esperaba data.palabras y data.historia`);
    }

    try {
      // 1. Crear las asociaciones (palabras) en la tabla Association
      const asociacionesCreadas = await Promise.all(
        data.palabras.map((palabra) =>
          this.prisma.association.create({
            data: {
              user_id: user_id,
              word: palabra.word,
              relation: palabra.relation,
            },
          })
        )
      );

      // 2. Crear los detalles de la historia en StoryDetails
      const storyDetailsCreada = await this.prisma.storyDetails.create({
        data: {
          user_id: user_id,
          title: data.historia.title,
          place: data.historia.place || null,
          character: data.historia.character || null,
          story_text: data.historia.story_text,
        },
      });

      // 3. Crear las relaciones en la tabla de intersección StoryAssociation
      const storyAssociationsCreadas = await Promise.all(
        asociacionesCreadas.map((asociacion) =>
          this.prisma.storyAssociation.create({
            data: {
              story_details_id: storyDetailsCreada.story_details_id,
              association_id: asociacion.association_id,
            },
          })
        )
      );

      return {
        asociaciones: asociacionesCreadas,
        storyDetails: storyDetailsCreada,
        storyAssociations: storyAssociationsCreadas,
        message: `Se crearon ${asociacionesCreadas.length} asociaciones, 1 historia y ${storyAssociationsCreadas.length} relaciones exitosamente`,
      };

    } catch (error) {
      console.error('Error en processEntry:', error);
      throw new Error(`Error al procesar los datos: ${error.message}`);
    }
  }
}
