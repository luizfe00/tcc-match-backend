-- AlterTable
CREATE SEQUENCE systemconfiguration_id_seq;
ALTER TABLE "SystemConfiguration" ALTER COLUMN "id" SET DEFAULT nextval('systemconfiguration_id_seq');
ALTER SEQUENCE systemconfiguration_id_seq OWNED BY "SystemConfiguration"."id";
