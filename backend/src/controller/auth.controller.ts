import { Request, Response, NextFunction } from 'express';
import { serverConfig } from '../config';
import { AuthService } from '../service/auth.service';

declare module 'express-session' {
  interface SessionData {
    userId: String | null;
  }
}

async function checkLoggedIn(req: Request, res: Response, next: NextFunction) {
  const userId = req.session.userId;
  if (userId) {
    const name = await AuthService.getUserName({ userId: +userId });
    res.status(200).json({ isLoggedIn: true, name });
  } else {
    // TODO: 깔끔하게 어떻게 보내는게 좋을지 고민..
    res.sendStatus(300);
  }
}

async function getSampleLogin(req: Request, res: Response, next: NextFunction) {
  req.session.userId = '1';
  res.status(200).json({ name: '시연용', isLoggedIn: true });
}

async function getOAuthGitHubCb(req: Request, res: Response, next: NextFunction) {
  const { code } = req.query;
  // TODO: GithubId로 할지, 우리 DB상 Id로 할지 의논해보기!
  const id = await AuthService.signInGithub(code as string);
  req.session.userId = `${id}`;
  res.redirect(serverConfig.origin_url as string);
}

async function logout(req: Request, res: Response, next: NextFunction) {
  const session = req.session;
  await AuthService.logout(session);
  res.status(200).send('logout success');
}

export const AuthController = {
  checkLoggedIn,
  getSampleLogin,
  getOAuthGitHubCb,
  logout,
};
