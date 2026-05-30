const envvars = {
    PORT: (process.env.PORT as string) || "8000",
    MONGODB_URI: process.env.MONGODB_URI as string,
    MONGODB_URI_TEST: process.env.MONGODB_URI_TEST as string,
}

export default envvars
