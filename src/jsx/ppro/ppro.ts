export const helloWorld = () => {
  alert("Hello, world! 1秒後にまたアラートが出ます");
  $.sleep(1000);
  alert("hello");

  return 0;
};
