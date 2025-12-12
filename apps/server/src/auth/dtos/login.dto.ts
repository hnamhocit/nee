import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '5a9c0fae-acdc-4ae0-bee5-39d46619c212',
    description: 'Device ID (Mobile: HardwareID / Web: Fingerprint)',
  })
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd!',
  })
  @IsStrongPassword()
  password: string;
}
