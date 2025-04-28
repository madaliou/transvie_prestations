import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('clients')
export class ClientController {
    constructor (private readonly clientService: ClientService) {}
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() req) {
        const agenceId = req.user.agenceId
        return this.clientService.findAll(agenceId);
    }
}
