import * as gutil from 'gulp-util';
import * as through from 'through2';


export function escapeString() {
    const PLUGIN_NAME = 'gulp-html-script';

    return through.obj(function(file, enc, cb) {
        // 如果文件为空，不做任何操作，转入下一个操作，即下一个 .pipe()
        if (file.isNull()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'file is empty'));
            return cb();
        }

        // 插件不支持对 Stream 对直接操作，跑出异常
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            const content = escapeHtml(file.contents.toString());
            file.contents = new Buffer(content);
            this.push(file);
            cb();
        }
    }); 
}

function escapeHtml (str: string): string {
    return str.replace(/<script|<\/script>/ig, function (str) {
        return '&lt;' + str.substring(1);
    });
}