import { injectable } from 'tsyringe';

import { User } from '../schemas/User';

interface ICreateUserDTO {
  socket_id: string;
  name: string;
  email: string;
  avatar: string;
}

@injectable()
class CreateUserService {
  async execute({
    socket_id,
    name,
    email,
    avatar,
  }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await User.findOne({ email }).exec();

    let user: User;

    if (userAlreadyExists) {
      user = await User.findOneAndUpdate(
        {
          _id: userAlreadyExists.id,
        },
        {
          $set: { socket_id, name, avatar },
        },
      );
    } else {
      user = await User.create({
        socket_id,
        name,
        email,
        avatar,
      });
    }

    return user;
  }
}

export { CreateUserService };
