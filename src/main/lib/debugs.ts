export const verifyDebugAndErrorsFile = (contextFile, type) => {
    const path = require('path');
    const fs = require('fs');
    const route = 'C:/carDiHomologacao';
    const dir = 'C:/carDiHomologacao/logs';
    const date = new Date();
    const dateHours = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    const dateToLocaleDateString = date.toLocaleDateString().replace(/\//g, '-');
    const logFile = path.join(dir, `${type === 0 ? 'errors' : 'debug'}${dateToLocaleDateString}.txt`);

    if (!fs.existsSync(route)) {
        fs.mkdirSync(route);
    }

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    if (fs.existsSync(logFile)) {
        readAndWriteFile(logFile, contextFile, dateHours);
    } else {
        writeFile(logFile, contextFile, dateHours);
    }
};

export const writeFile = (logFile, contextFile, dateHours) => {
    const fs = require('fs');
    let newContextFile = '';
    for (let i = 0; i < contextFile.length; i++) {
        newContextFile += contextFile[i];
        if ((i + 1) % 60 === 0) {
            newContextFile += '\n';
        }
    }
    fs.writeFileSync(`${logFile}`, `[ ${dateHours} ] - ${newContextFile}`);
    removeFiles();
};

export const readAndWriteFile = (logFile, contextFile, dateHours) => {
    const fs = require('fs');
    fs.readFile(logFile, 'utf8', function (err, data) {
        if (err) throw err;

        // Adiciona uma nova linha ao conteúdo original
        let newContextFile = `\n\n[ ${dateHours} ] - `;
        for (let i = 0; i < contextFile.length; i++) {
            newContextFile += `${contextFile[i]}`;
            if ((i + 1) % 60 === 0) {
                newContextFile += '\n';
            }
        }

        const newContextFileDate = data + newContextFile;

        // Escreve o novo conteúdo de volta no arquivo
        fs.writeFile(logFile, newContextFileDate, function (err) {
            if (err) throw err;
            console.log('Conteúdo adicionado com sucesso!');
        });
    });
};

export const removeFiles = () => {
    const path = require('path');
    const fs = require('fs');
    const dir = 'C:/carDiHomologacao/logs';

    const currentDate = new Date(); // Data atual
    const deleteAfterDays = 7;

    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error('Erro ao ler o diretório:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(dir, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Erro ao obter as informações do arquivo:', err);
                    return;
                }

                const creationDate = stats.birthtime; // Data de criação do arquivo

                const timeDiff = currentDate.getTime() - creationDate.getTime(); // Diferença em milissegundos entre a data atual e a data de criação
                const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Diferença em dias

                if (daysDiff >= deleteAfterDays) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Erro ao excluir o arquivo:', err);
                            return;
                        }
                        console.log('Arquivo excluído com sucesso:', filePath);
                    });
                }
            });
        });
    });
};
