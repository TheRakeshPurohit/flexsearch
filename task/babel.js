const child_process = require("child_process");
const fs = require("fs");
const debug = process.argv[2] && process.argv[2].toLowerCase().includes("debug=true");
const minify = process.argv[2] && process.argv[2].toLowerCase().includes("release=min");

console.log("Start build .....");
console.log('Bundle: ' + ('module' /* 'custom' */) + (debug ?  ":debug" : (minify ?  ":min" : "")));

fs.rmSync("tmp/", { recursive: true });
fs.mkdirSync("tmp");
fs.existsSync("dist") || fs.mkdirSync("dist");

(async function(){

    let files = await fs.promises.readdir("./src/");
    files.forEach(function(file){
        if(file.endsWith(".js")){
            let src = fs.readFileSync("src/" + file, "utf8");
            src = src.replace(/\/\/ COMPILER BLOCK -->(.*)<-- COMPILER BLOCK/gs, "");
            fs.writeFileSync("tmp/" + file, src);
        }
    });

    fs.existsSync("./tmp/db") || fs.mkdirSync("./tmp/db/");
    fs.existsSync("./tmp/lang") || fs.mkdirSync("./tmp/lang/");
    fs.existsSync("./tmp/charset") || fs.mkdirSync("./tmp/charset/");

    ["db/",
     "db/clickhouse",
     "db/indexeddb",
     "db/mongo",
     "db/postgres",
     "db/redis",
     "db/sqlite",
     "document",
     "index",
     "resolve",
     "worker",
     "lang",
     "charset/",
     "charset/latin",
     "charset/arabic",
     "charset/cjk",
     "charset/cyrillic"
    ].forEach(await async function(path){
        fs.existsSync("./tmp/" + path + "/") || fs.mkdirSync("./tmp/" + path + "/");
        files = await fs.promises.readdir("./src/" + path + "/");
        files.forEach(function(file){
            if(file.endsWith(".old.js")) return;
            if(file.endsWith(".wip.js")) return;
            if(file.endsWith(".js")){
                let src = fs.readFileSync("src/" + path + "/" + file, "utf8");
                src = src.replace(/\/\/ COMPILER BLOCK -->(.*)<-- COMPILER BLOCK/gs, "");
                fs.writeFileSync("tmp/" + path + "/" + file, src);
            }
        });
    });

    //fs.copyFileSync("src/db/interface.js", "tmp/db/interface.js");
    fs.copyFileSync("task/babel." + (debug ? "debug": (minify ? "min" : "bundle")) + ".json", "tmp/.babelrc");
    fs.existsSync("dist/module" + (debug ? "-debug" : (minify ? "-min" : ""))) && fs.rmSync("dist/module" + (debug ? "-debug" : (minify ? "-min" : "")), { recursive: true });
    fs.mkdirSync("dist/module" + (debug ? "-debug" : (minify ? "-min" : "")));

    exec("npx babel tmp -d dist/module" + (debug ? "-debug" : (minify ? "-min --minified --compact true" : "")) + " --config-file tmp/.babelrc && exit 0", function(){
        console.log("Build Complete.");
    });
}());

function exec(prompt, callback){

    const child = child_process.exec(prompt, function(err, stdout, stderr){
        if(err){
            console.error(err);
        }
        else{
            callback && callback();
        }
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
}
