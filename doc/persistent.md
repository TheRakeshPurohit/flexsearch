## Persistent Indexes

FlexSearch provides a new Storage Adapter where indexes are delegated through persistent storages.

Supported:

- [IndexedDB (Browser)](persistent-indexeddb.md)
- [Redis](persistent-redis.md)
- [SQLite](persistent-sqlite.md)
- [Postgres](persistent-postgres.md)
- [MongoDB](persistent-mongodb.md)
- [Clickhouse](persistent-clickhouse.md)

The `.export()` and `.import()` methods are still available for non-persistent In-Memory indexes.

All search capabilities are available on persistent indexes like:
- Context-Search
- Suggestions
- Cursor-based Queries (Limit/Offset)
- Scoring (supports a resolution of up to 32767 slots)
- Document-Search
- Partial Search
- Multi-Tag-Search
- Boost Fields
- Custom Encoder
- Resolver
- Tokenizer (Strict, Forward, Reverse, Full)
- Document Store (incl. enrich results)
- Worker Threads to run in parallel
- Auto-Balanced Cache (top queries + last queries)

All persistent variants are optimized for larger sized indexes under heavy workload. Almost every task will be streamlined to run in batch/parallel, getting the most out of the selected database engine. Whereas the InMemory index can't share their data between different nodes when running in a cluster, every persistent storage can handle this by default.

Examples Node.js:

- [nodejs-commonjs](../example/nodejs-commonjs):
    - [basic-persistent](../example/nodejs-commonjs/basic-persistent)
    - [document-persistent](../example/nodejs-commonjs/document-persistent)
- [nodejs-esm](../example/nodejs-esm):
    - [basic-persistent](../example/nodejs-esm/basic-persistent)
    - [document-persistent](../example/nodejs-esm/document-persistent)

Examples Browser:

- [browser-legacy](../example/browser-legacy):
    - [basic-persistent](../example/browser-legacy/basic-persistent)
    - [document-persistent](../example/browser-legacy/document-persistent)
- [browser-module](../example/browser-module):
    - [basic-persistent](../example/browser-module/basic-persistent)
    - [document-persistent](../example/browser-module/document-persistent)

```js
import FlexSearchIndex from "./index.d.ts";
import Database from "./db/indexeddb/index.js";
// create an index
const index = new FlexSearchIndex();
// create db instance with optional prefix
const db = new Database("my-store");
// mount and await before transfering data
await flexsearch.mount(db);

// update the index as usual
index.add(1, "content...");
index.update(2, "content...");
index.remove(3);

// changes are automatically committed by default
// when you need to wait for the task completion, then you
// can use the commit method explicitely:
await index.commit();
```

Alternatively mount a store by index creation:

```js
const index = new FlexSearchIndex({
    db: new Storage("my-store")
});

// await for the db response before access the first time
await index.db;
// apply changes to the index
// ...
```

Query against a persistent storage just as usual:

```js
const result = await index.search("gulliver");
```

Auto-Commit is enabled by default and will process changes asynchronously in batch.
You can fully disable the auto-commit feature and perform them manually:

```js
const index = new FlexSearchIndex({
    db: new Storage("my-store"),
    commit: false
});
// update the index
index.add(1, "content...");
index.update(2, "content...");
index.remove(3);

// transfer all changes to the db
await index.commit();
```

You can call the commit method manually also when `commit: true` option was set.

### Benchmark

The benchmark was measured in "terms per second".

<table>
    <tr>
        <th align="left">Store</th>
        <th>Add</th>
        <th>Search 1</th>
        <th>Search N</th>
        <th>Replace</th>
        <th>Remove</th>
        <th>Not Found</th>
        <th>Scaling</th>
    </tr>
    <tr>
        <td></td>
        <td align="right"><sub>terms per sec</sub></td>
        <td align="right"><sub>terms per sec</sub></td>
        <td align="right"><sub>terms per sec</sub></td>
        <td align="right"><sub>terms per sec</sub></td>
        <td align="right"><sub>terms per sec</sub></td>
        <td align="right"><sub>terms per sec</sub></td>
        <td></td>
    </tr>
    <!--
    <tr>
        <td align="left">Memory</td>
        <td align="right">28,345,405</td>
        <td align="right">65,180,102</td>
        <td align="right">12,098,298</td>
        <td align="right">19,099,981</td>
        <td align="right">36,164,827</td>
        <td align="right">143,369,175</td>
        <td align="right">No</td>
    </tr>
    -->
    <tr>
        <td align="left">IndexedDB</td>
        <td align="right">123,298</td>
        <td align="right">83,823</td>
        <td align="right">62,370</td>
        <td align="right">57,410</td>
        <td align="right">171,053</td>
        <td align="right">425,744</td>
        <td align="right">No</td>
    </tr>
    <tr>
        <td align="left">Redis</td>
        <td align="right">1,566,091</td>
        <td align="right">201,534</td>
        <td align="right">859,463</td>
        <td align="right">117,013</td>
        <td align="right">129,595</td>
        <td align="right">875,526</td>
        <td align="right">Yes</td>
    </tr>
    <tr>
        <td align="left">Sqlite</td>
        <td align="right">269,812</td>
        <td align="right">29,627</td>
        <td align="right">129,735</td>
        <td align="right">174,445</td>
        <td align="right">1,406,553</td>
        <td align="right">122,566</td>
        <td align="right">No</td>
    </tr>
    <tr>
        <td align="left">Postgres</td>
        <td align="right">354,894</td>
        <td align="right">24,329</td>
        <td align="right">76,189</td>
        <td align="right">324,546</td>
        <td align="right">3,702,647</td>
        <td align="right">50,305</td>
        <td align="right">Yes</td>
    </tr>
    <tr>
        <td align="left">MongoDB</td>
        <td align="right">515,938</td>
        <td align="right">19,684</td>
        <td align="right">81,558</td>
        <td align="right">243,353</td>
        <td align="right">485,192</td>
        <td align="right">67,751</td>
        <td align="right">Yes</td>
    </tr>
    <tr>
        <td align="left">Clickhouse</td>
        <td align="right">1,436,992</td>
        <td align="right">11,507</td>
        <td align="right">22,196</td>
        <td align="right">931,026</td>
        <td align="right">3,276,847</td>
        <td align="right">16,644</td>
        <td align="right">Yes</td>
    </tr>
</table>

__Search 1:__ Single term query<br>
__Search N:__ Multi term query (Context-Search)

The benchmark was executed against a single client.
