import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TokenDocument extends Document {
  @Prop({ required: true })
  card_number: string;

  @Prop({ required: true })
  cvv: string;

  @Prop({ required: true })
  expiration_month: string;

  @Prop({ required: true })
  expiration_year: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ default: Date.now})
  createdAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(TokenDocument);

TokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60*15 }); // 15 minutos de expiración
