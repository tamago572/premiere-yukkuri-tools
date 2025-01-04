interface placeAudioWithSubtitlesProps {
  subtitleFilePath: string;
  voiceFilePath: string;
}

export const placeAudioWithSubtitles = ({
  subtitleFilePath,
  voiceFilePath,
}: placeAudioWithSubtitlesProps) => {
  alert(`subtitle: ${subtitleFilePath}, voice: ${voiceFilePath}`);
  return { exitCode: 0, msg: "正常に終了しました" };
};
