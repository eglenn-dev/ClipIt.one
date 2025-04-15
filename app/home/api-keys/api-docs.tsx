export default function APIDocs() {
    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">API Documentation</h1>
            <p className="text-gray-700">
                This is the API documentation for ClipIt. You can use this API
                to create and manage your links.
            </p>
            <h2 className="text-xl font-semibold">Creating a Link</h2>
            <p className="text-gray-700">
                To create a link, send a POST request to <code>/api/link</code>{" "}
                with the following JSON body:
            </p>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                {`{
    "url": "https://example.com"
}`}
            </pre>
            <p className="text-gray-700">
                The <code>url</code> field is required and must be a valid URL.
            </p>
            <p className="text-gray-700">
                There is an optional <code>slug</code> field that can be used to
                specify a custom slug for the link. If not provided, a random
                slug will be generated.
            </p>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                {`{
    "url": "https://example.com",
    "slug": "<CUSTOM_SLUG>"
}`}
            </pre>
            <p className="text-gray-700">
                Make sure to include the <code>Authorization</code> header with
                your API key:
            </p>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                {`Authorization: Bearer <YOUR_API_KEY>`}
            </pre>
            <h2 className="text-xl font-semibold">Response</h2>
            <p className="text-gray-700">
                On success, you will receive a JSON response with the following
                structure:
            </p>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                {`{
    "destinationUrl": "https://example.com",
    "linkSlug": "<GENERATED_LINK_SLUG>",
    "fullUrl": "https://clipit.one/<GENERATED_LINK_SLUG>",
    "status": "success",
    "message": "Link created successfully"
}`}
            </pre>
            <p className="text-gray-700">
                If there is an error, you will receive a JSON response with the
                following structure:
            </p>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                {`{
    "status": "error",
    "message": "Error message"
}`}
            </pre>
            <h2 className="text-xl font-semibold">Error Codes</h2>
            <ul className="list-disc pl-6 text-gray-700">
                <li>
                    <strong>400:</strong> Bad Request - Invalid URL or missing
                    parameters.
                </li>
                <li>
                    <strong>401:</strong> Unauthorized - Invalid API key.
                </li>
                <li>
                    <strong>500:</strong> Internal Server Error - Something went
                    wrong on our end.
                </li>
            </ul>
        </div>
    );
}
