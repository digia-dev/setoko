import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { StoresService } from './stores.service';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  createStore(
    @CurrentUser() user: { id: string },
    @Body()
    dto: {
      name: string;
      slug: string;
      description?: string;
      logo_url?: string;
      whatsapp?: string;
      address?: string;
    },
  ) {
    return this.storesService.createStore(user.id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyStores(@CurrentUser() user: { id: string }) {
    return this.storesService.findByUser(user.id);
  }

  @Get(':storeId')
  getStore(@Param('storeId') storeId: string) {
    return {
      id: storeId,
      name: 'Sample Store',
      slug: 'sample-store',
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':storeId')
  updateStore(@Param('storeId') storeId: string, @Body() dto: Record<string, any>) {
    return {
      id: storeId,
      ...dto,
    };
  }
}
