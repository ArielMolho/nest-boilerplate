import { Client } from 'src/clients/entities/client.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  website: string;
  @Column()
  email: string;
  @Column()
  phone: number;
  @Column()
  address: string;
  @Column()
  city: string;
  @Column()
  state: string;
  @Column()
  zip: string;
  @Column()
  country: string;
  @OneToMany(() => Client, (client) => client.company)
  clients: Client[];
}
