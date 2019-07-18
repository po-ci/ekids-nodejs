module.exports = function makeDirSync (dirpath) {
    try {
        fs.mkdirSync(dirpath, { recursive: true })
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
}