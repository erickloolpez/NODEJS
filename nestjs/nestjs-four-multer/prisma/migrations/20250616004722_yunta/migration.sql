-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "nombre_usuario" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "diccionarios" (
    "id_diccionario" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "nombre_diccionario" VARCHAR(255),
    "descripcion" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diccionarios_pkey" PRIMARY KEY ("id_diccionario")
);

-- CreateTable
CREATE TABLE "palabras" (
    "id_palabra" SERIAL NOT NULL,
    "id_diccionario" INTEGER NOT NULL,
    "palabra" VARCHAR(255) NOT NULL,
    "relacion" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "palabras_pkey" PRIMARY KEY ("id_palabra")
);

-- CreateTable
CREATE TABLE "historias" (
    "id_historia" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_diccionario" INTEGER NOT NULL,
    "titulo_historia" VARCHAR(255),
    "historia" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historias_pkey" PRIMARY KEY ("id_historia")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "idx_usuarios_email" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "idx_diccionarios_usuario" ON "diccionarios"("id_usuario");

-- CreateIndex
CREATE INDEX "idx_palabras_diccionario" ON "palabras"("id_diccionario");

-- CreateIndex
CREATE INDEX "idx_historias_usuario" ON "historias"("id_usuario");

-- CreateIndex
CREATE INDEX "idx_historias_diccionario" ON "historias"("id_diccionario");

-- AddForeignKey
ALTER TABLE "diccionarios" ADD CONSTRAINT "diccionarios_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "palabras" ADD CONSTRAINT "palabras_id_diccionario_fkey" FOREIGN KEY ("id_diccionario") REFERENCES "diccionarios"("id_diccionario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historias" ADD CONSTRAINT "historias_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historias" ADD CONSTRAINT "historias_id_diccionario_fkey" FOREIGN KEY ("id_diccionario") REFERENCES "diccionarios"("id_diccionario") ON DELETE CASCADE ON UPDATE CASCADE;
