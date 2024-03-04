import fs from 'fs';
import path from 'path';
import sessionJson from '@/session.json'; 


interface Session {
    id: number;
    gid: number;
    ip: string;
}

interface SessionsData {
    [key: string]: Session;
}

const sessions: SessionsData = sessionJson

export function salvarArquivoJSON(data: SessionsData) {
    try {
        const filePath = path.join('./session.json')
        console.log(filePath)
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4)); 
        console.log('Arquivo JSON atualizado com sucesso.');
    } catch (error) {
        console.error('Erro ao salvar o arquivo JSON:', error);
    }
}

export function adicionarOuAtualizarItem(chave: string, session: Session) {

    const sessionExistente = sessions[chave] || {};
    if (session.id !== undefined) {
        sessionExistente.id = session.id;
    }
    if (session.gid !== undefined) {
        sessionExistente.gid = session.gid;
    }
    if (session.ip !== undefined) {
        sessionExistente.ip = session.ip;
    }
    sessions[chave] = sessionExistente;
    
    salvarArquivoJSON(sessions);
}

export function obterItem(chave: string): Session | null {
    return sessions[chave] || null;
}
