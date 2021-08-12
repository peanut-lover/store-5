import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../service/auth.service';

async function getOAuthGitHubCb(req: Request, res: Response, next: NextFunction) {
  const { code } = req.query;
  const id = await AuthService.signInGithub(code as string);
  req.session.user = `${id}`;
  res.redirect('/');
}

export const AuthController = {
  getOAuthGitHubCb,
};
