export default function ConvertToURLfromFile(files: Express.Multer.File[], host: string) {
  return files.reduce((acc: string[], { path }) => {
    acc.push(`http://${host}/${path}`);
    return acc;
  }, []);
}
