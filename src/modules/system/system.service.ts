import { SystemSettings } from "./system.model";

const getSettings = async () => {
  let settings = await SystemSettings.findOne({ key: "global" });
  if (!settings) {
    settings = await SystemSettings.create({
      key: "global",
      areSubmissionsOpen: true,
    });
  }
  return settings;
};

export const isSubmissionOpen = async () => {
  const settings = await getSettings();
  return settings.areSubmissionsOpen;
};

export const toggleSubmissionWindow = async (isOpen: boolean) => {
  const settings = await getSettings();
  settings.areSubmissionsOpen = isOpen;
  await settings.save();
  return settings;
};

export const getSubmissionWindowStatus = async () => {
  return await getSettings();
};
