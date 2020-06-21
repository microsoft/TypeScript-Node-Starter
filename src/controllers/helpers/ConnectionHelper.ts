// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import url from "url";
import redis from "redis";
import mysql from "mysql";
import {MongoClient} from "mongodb";
import sidekiq from "sidekiq";

let VolatileMemoryClient = null;
let RelationalDatabaseClient = null;
let DocumentDatabaseClient = null;
let PrioritizedWorkerVolatileMemoryClient = null;
let PrioritizedWorkerClient = null;

if (process.env.VOLATILE_MEMORY_KEY) {
	const connectionURL = new URL(process.env[process.env.VOLATILE_MEMORY_KEY]);
	VolatileMemoryClient = redis.createClient({
		host     : connectionURL.host,
	  user     : connectionURL.username,
	  password : connectionURL.password,
	  port     : connectionURL.port
	});
}
if (process.env.RELATIONAL_DATABASE_KEY) {
	const connectionURL = new URL(process.env[process.env.RELATIONAL_DATABASE_KEY]);
	RelationalDatabaseClient = mysql.createPool({
	  connectionLimit : 10,
	  host     : connectionURL.host,
	  user     : connectionURL.username,
	  password : connectionURL.password,
	  database : connectionURL.pathname.split('/')[1]
	});
}
if (process.env.DOCUMENT_DATABASE_KEY) {
	const connectionURL = process.env[process.env.DOCUMENT_DATABASE_KEY];
	DocumentDatabaseClient = new MongoClient(connectionURL);
}
if (process.env.PRIORITIZED_WORKER_KEY) {
	if (process.env.PRIORITIZED_WORKER_KEY == process.env.VOLATILE_MEMORY_KEY) {
		PrioritizedWorkerVolatileMemoryClient = VolatileMemoryClient;
	} else {
		const connectionURL = new URL(process.env[process.env.PRIORITIZE_WORKER_KEY]);
		PrioritizedWorkerVolatileMemoryClient = mysql.createConnection({
		  host     : connectionURL.host,
		  user     : connectionURL.username,
		  password : connectionURL.password,
		  port     : connectionURL.port
		});
	}
	PrioritizedWorkerClient = new sidekiq(PrioritizedWorkerVolatileMemoryClient, process.env.NODE_ENV);
}

export {VolatileMemoryClient, RelationalDatabaseClient, DocumentDatabaseClient, PrioritizedWorkerVolatileMemoryClient, PrioritizedWorkerClient};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.