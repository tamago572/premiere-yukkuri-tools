interface placeAudioWithSubtitlesProps {
  subtitleFilePath: string;
  voiceFilePath: string;
}

export const placeAudioWithSubtitles = ({
  subtitleFilePath,
  voiceFilePath,
}: placeAudioWithSubtitlesProps) => {
  alert("ok");
  return { exitCode: 0, msg: "正常に終了しました" };
};
