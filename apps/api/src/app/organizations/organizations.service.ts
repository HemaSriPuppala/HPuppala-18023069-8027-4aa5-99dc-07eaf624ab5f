import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,
  ) { }

  create(createOrganizationDto: CreateOrganizationDto) {
    const org = this.orgRepository.create(createOrganizationDto);
    return this.orgRepository.save(org);
  }

  findAll() {
    return this.orgRepository.find({ relations: ['children'] });
  }

  findOne(id: string) {
    return this.orgRepository.findOne({ where: { id }, relations: ['children', 'parent'] });
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    const org = await this.findOne(id);
    if (!org) return null;
    Object.assign(org, updateOrganizationDto);
    return this.orgRepository.save(org);
  }

  async remove(id: string) {
    const org = await this.findOne(id);
    if (org) return this.orgRepository.remove(org);
    return null;
  }
}
