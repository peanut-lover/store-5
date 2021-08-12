import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../service/auth.service';

async function getOAuthGitHubCb(req: Request, res: Response, next: NextFunction) {
  const { code } = req.query;
  // TODO: GithubId로 할지, 우리 DB상 Id로 할지 의논해보기!
  const id = await AuthService.signInGithub(code as string);
  req.session.userId = id;
  res.redirect('/');
}

export const AuthController = {
  getOAuthGitHubCb,
};
