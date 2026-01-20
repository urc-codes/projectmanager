import mongoose, { Schema, Document } from 'mongoose';

export interface ISystemSettings extends Document {
  key: string; 
  areSubmissionsOpen: boolean;
}

const systemSettingsSchema = new Schema<ISystemSettings>({
  key: { type: String, default: 'global', unique: true },
  areSubmissionsOpen: { type: Boolean, default: true }, 
});

export const SystemSettings = mongoose.model<ISystemSettings>('SystemSettings', systemSettingsSchema);