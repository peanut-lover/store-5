import { Request, Response } from 'express';
import { serverConfig } from '../config';
import { AuthService } from '../service/auth.service';
import { CreateAddressRequest } from '../types/request/auth.request';

async function checkLoggedIn(req: Request, res: Response) {
  const userId = req.session.userId;
  if (userId) {
    const name = await AuthService.getUserName(userId);
    res.status(200).json({ isLoggedIn: true, name });
  } else {
    res.sendStatus(300);
  }
}

async function getSampleLogin(req: Request, res: Response) {
  // TODO: 시연용 id = 1 추가해야함!
  req.session.userId = 1;
  res.status(200).json({ name: '시연용', isLoggedIn: true });
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

async function getAddresses(req: Request, res: Response) {
  const userId = req.userId;
  const result = await AuthService.getAddresses(1);
  res.status(200).json(result);
}

async function createAddress(req: CreateAddressRequest, res: Response) {
  const userId = req.userId;
  const result = await AuthService.createAddress(1, req.body);
}

async function deleteAddress(req: Request, res: Response) {
  const userId = req.userId;
  const addressId = req.params.id;
  await AuthService.deleteAddress(userId, +addressId);
  res.sendStatus(204);
}

async function updateAddress(req: Request, res: Response) {
  console.log('hihi');
}

export const AuthController = {
  checkLoggedIn,
  getSampleLogin,
  getOAuthGitHubCb,
  logout,
  getAddresses,
  createAddress,
  deleteAddress,
  updateAddress,
};
