-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "dictionaries" (
    "dictionary_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "dictionary_name" VARCHAR(255),
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dictionaries_pkey" PRIMARY KEY ("dictionary_id")
);

-- CreateTable
CREATE TABLE "words" (
    "word_id" SERIAL NOT NULL,
    "dictionary_id" INTEGER NOT NULL,
    "word" VARCHAR(255) NOT NULL,
    "relation" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "words_pkey" PRIMARY KEY ("word_id")
);

-- CreateTable
CREATE TABLE "stories" (
    "story_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "dictionary_id" INTEGER NOT NULL,
    "story_title" VARCHAR(255),
    "story" TEXT NOT NULL,
    "character" VARCHAR(255),
    "place" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stories_pkey" PRIMARY KEY ("story_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_dictionaries_user" ON "dictionaries"("user_id");

-- CreateIndex
CREATE INDEX "idx_words_dictionary" ON "words"("dictionary_id");

-- CreateIndex
CREATE INDEX "idx_stories_user" ON "stories"("user_id");

-- CreateIndex
CREATE INDEX "idx_stories_dictionary" ON "stories"("dictionary_id");

-- AddForeignKey
ALTER TABLE "dictionaries" ADD CONSTRAINT "dictionaries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "words" ADD CONSTRAINT "words_dictionary_id_fkey" FOREIGN KEY ("dictionary_id") REFERENCES "dictionaries"("dictionary_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "stories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "stories_dictionary_id_fkey" FOREIGN KEY ("dictionary_id") REFERENCES "dictionaries"("dictionary_id") ON DELETE CASCADE ON UPDATE CASCADE;
