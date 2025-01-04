interface placeAudioWithSubtitlesProps {
  voiceFilePath: string;
  text: string;
  selectedMogrt: string;
}

export const placeAudioWithSubtitles = (props: placeAudioWithSubtitlesProps) => {
  alert(`subtitle: ${props.selectedMogrt}, voice: ${props.voiceFilePath}, text: ${props.text}`);
  return { exitCode: 0, msg: "正常に終了しました" };
};

export const showAlert = (msg: string) => {
  alert(msg);
};
