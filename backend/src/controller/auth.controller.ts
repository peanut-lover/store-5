import { Request, Response } from 'express';
import { serverConfig } from '../config';
import { AuthService } from '../service/auth.service';

async function checkLoggedIn(req: Request, res: Response) {
  const userId = req.session.userId;
  if (userId) {
    const name = await AuthService.getUserName(userId);
    res.status(200).json({ result: { isLoggedIn: true, name } });
  } else {
    res.status(200).json({ result: { isLoggedIn: false, name: '' } });
  }
}

async function getSampleLogin(req: Request, res: Response) {
  const userId = 1;
  req.session.userId = userId;
  const name = await AuthService.getUserName(userId);
  res.status(200).json({ result: { name, isLoggedIn: true } });
}

async function getOAuthGitHubCb(req: Request, res: Response) {
  const { code } = req.query;
  const id = await AuthService.signInGithub(code as string);
  req.session.userId = id;
  res.redirect(serverConfig.origin_url as string);
}

async function logout(req: Request, res: Response) {
  const session = req.session;
  await AuthService.validateForLogout(session.userId);
  await AuthService.logout(session);
  res.status(200).send('logout success');
}

export const AuthController = {
  checkLoggedIn,
  getSampleLogin,
  getOAuthGitHubCb,
  logout,
};
