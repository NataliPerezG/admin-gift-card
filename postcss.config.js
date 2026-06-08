import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import postcssReporter from 'postcss-reporter';

export default {
    plugins: [
        postcssImport(),
        autoprefixer(),
        postcssPresetEnv({
            stage: 2,
            features: {
                "nesting-rules": true,
                "custom-media-queries": true,
            }
        }),
        postcssReporter(
            {
                clearReportedMessages: true
            }
        )
    ]
}