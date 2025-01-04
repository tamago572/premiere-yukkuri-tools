export interface SettingsProps {
  subtitle: string;
  subtitleFile: string;
  subtitleTrack: number;
  audioTrack: number;
  buffer: number;
  textFileName: string;
  textEncoding: string;
  lineFeedCode: string;
  debugMode: boolean;
}

export interface SettingsStateHook {
  settings: SettingsProps;
  setSettings: React.Dispatch<React.SetStateAction<SettingsProps>>;
}
