import { NextResponse } from 'next/server';
import { gameData } from '@/data/gameData';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: gameData
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "No se pudieron cargar los datos del mundo"
    }, { status: 500 });
  }
}