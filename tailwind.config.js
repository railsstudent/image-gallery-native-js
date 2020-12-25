module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontSize: {
                '2rem': '2rem',
                small: ['1.5rem', '1rem'],
            },
            margin: {
                s2: '0.625rem',
            },
        },
        backgroundColor: (theme) => ({
            ...theme('colors'),
            'white-254': '#fefefe',
        }),
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
