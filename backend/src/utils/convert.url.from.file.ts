export default function ConvertToURLfromFile(files: Express.Multer.File[]) {
  return files.reduce((acc: string[], { path }) => {
    acc.push(`http://${req.get('host')}/${path}`);
    return acc;
  }, []);
}
