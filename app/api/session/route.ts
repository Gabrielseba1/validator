import { adicionarOuAtualizarItem, obterItem } from "@/modules/ModJson";
import { NextRequest, NextResponse } from "next/server";

function extrairEnderecoIP(ipCompleto: string): string {
    const partes = ipCompleto.split(':');
    console.log(partes)
    if (partes.length === 4 && ipCompleto.includes('::ffff')) {
        return partes[3]; // Retorne o último elemento que contém o endereço IP real
    } else {
        return ipCompleto; // Se não houver prefixo, retorne o IP completo
    }
}

export async function POST(req: NextRequest, res: NextResponse){
    try{
        const data = await req.json();
        const { id, gid, token } = data;
        const clientIP = req.headers.get('x-forwarded-for') || req.nextUrl.hostname;
        adicionarOuAtualizarItem(token, { id: id, gid: gid, ip: extrairEnderecoIP(clientIP) })    
        return NextResponse.json({status: true})
    }catch(err){
        console.log(err)
        return NextResponse.json({status: false})
    }
}

export async function GET(req: NextRequest, res: NextResponse){
    try{
        const params = req.nextUrl.searchParams
        const token = params.get('token')
        const item = obterItem(token as string)   
        const clientIP = req.headers.get('x-forwarded-for') || req.nextUrl.hostname;
        console.log(extrairEnderecoIP(clientIP))
        return NextResponse.json({status: item})
    }catch(err){
        console.log(err)
        return NextResponse.json({status: false})
    }
}