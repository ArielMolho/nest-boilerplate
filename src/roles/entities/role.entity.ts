import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  role: string;
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
