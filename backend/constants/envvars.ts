const envvars = {
    PORT: (process.env.PORT as string) || "8000",
    MONGODB_URI: process.env.MONGODB_URI as string,
}

export default envvars
