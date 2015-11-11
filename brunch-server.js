'use strict';

var Path       = require('path');
var express    = require('express');
var http       = require('http');
var logger     = require('morgan');
var bodyParser = require('body-parser');

module.exports = function startServer(port, path, callback) {
    var app = express();
    var server = http.createServer(app);

    app.use(express.static(Path.join(__dirname, path)));
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/health', function(req, res) {
        res.status(200).end('OK');
    });

    app.get('/_internal/services.json', function(req, res) {
        res.json([
            {name: "mesos", path: "/mesos"},
            {name: "marathon", path: "/marathon"},
            {name: "consul", path: "/consul"},
            {name: "chronos", path: "/chronos"}
        ]);
    });

    app.get('/1/packages', function(req, res) {
        res.json(module.data);
    });

    app.get('/1/packages/:name', function(req, res) {
        var name = req.params.name;

        for (var i in module.data) {
            var app = module.data[i];
            if (app.name === name) {
                res.json(app);
                return;
            }
        }

        res.status(400).end();
    });

    server.listen(port, callback);
    return server;
};

// DATA //

module.data = [
    {
        "currentVersion": "0.2.1",
        "description": "A distributed free and open-source database with a flexible data model for documents, graphs, and key-values. Build high performance applications using a convenient SQL-like query language or JavaScript extensions.",
        "framework": true,
        "name": "arangodb",
        "supported": false,
        "tags": [
            "arangodb",
            "NoSQL",
            "database",
            "framework"
        ],
        "versions": {
            "0.2.0": {
                "index": "0",
                "supported": false,
                "version": "0.2.0"
            },
            "0.2.1": {
                "index": "1",
                "supported": false,
                "version": "0.2.1"
            }
        }
    },
    {
        "currentVersion": "0.2.0-1",
        "description": "Apache Cassandra running on Apache Mesos",
        "framework": true,
        "name": "cassandra",
        "supported": true,
        "tags": [
            "data",
            "database",
            "nosql"
        ],
        "versions": {
            "0.1.0-1": {
                "index": "0",
                "supported": true,
                "version": "0.1.0-1"
            },
            "0.2.0-1": {
                "index": "1",
                "supported": true,
                "version": "0.2.0-1"
            }
        }
    },
    {
        "currentVersion": "2.4.0",
        "description": "A fault tolerant job scheduler for Mesos which handles dependencies and ISO8601 based schedules.",
        "framework": true,
        "name": "chronos",
        "supported": false,
        "tags": [
            "cron",
            "analytics",
            "batch"
        ],
        "versions": {
            "2.3.4": {
                "index": "0",
                "supported": false,
                "version": "2.3.4"
            },
            "2.4.0": {
                "index": "1",
                "supported": false,
                "version": "2.4.0"
            }
        }
    },
    {
        "currentVersion": "0.1.4",
        "description": "Hadoop Distributed File System (HDFS), Highly Available",
        "framework": true,
        "name": "hdfs",
        "supported": true,
        "tags": [
            "filesystem",
            "hadoop",
            "analytics"
        ],
        "versions": {
            "0.1.3": {
                "index": "0",
                "supported": false,
                "version": "0.1.3"
            },
            "0.1.4": {
                "index": "1",
                "supported": true,
                "version": "0.1.4"
            },
            "0.1.5": {
                "index": "2",
                "supported": false,
                "version": "0.1.5"
            }
        }
    },
    {
        "currentVersion": "0.9.0-beta",
        "description": "Apache Kafka running on top of Apache Mesos",
        "framework": true,
        "name": "kafka",
        "supported": true,
        "tags": [
            "message",
            "broker",
            "messaging"
        ],
        "versions": {
            "0.9.0-beta": {
                "index": "0",
                "supported": true,
                "version": "0.9.0-beta"
            },
            "0.9.2.0": {
                "index": "1",
                "supported": false,
                "version": "0.9.2.0"
            }
        }
    },
    {
        "currentVersion": "0.11.1",
        "description": "A cluster-wide init and control system for services in cgroups or Docker containers.",
        "framework": true,
        "name": "marathon",
        "supported": false,
        "tags": [
            "init",
            "long-running"
        ],
        "versions": {
            "0.10.1": {
                "index": "4",
                "supported": false,
                "version": "0.10.1"
            },
            "0.11.0": {
                "index": "5",
                "supported": false,
                "version": "0.11.0"
            },
            "0.11.1": {
                "index": "6",
                "supported": false,
                "version": "0.11.1"
            },
            "0.8.1": {
                "index": "0",
                "supported": false,
                "version": "0.8.1"
            },
            "0.9.0": {
                "index": "2",
                "supported": false,
                "version": "0.9.0"
            },
            "0.9.0-RC3": {
                "index": "1",
                "supported": false,
                "version": "0.9.0-RC3"
            },
            "0.9.2": {
                "index": "3",
                "supported": false,
                "version": "0.9.2"
            }
        }
    },
    {
        "currentVersion": "0.0.1",
        "description": "MemSQL running on Apache Mesos. This framework provides the ability to create and manage a set of MemSQL clusters, each running with the MemSQL Ops management tool.",
        "framework": true,
        "name": "memsql",
        "supported": true,
        "tags": [
            "mysql",
            "database",
            "rdbms"
        ],
        "versions": {
            "0.0.1": {
                "index": "0",
                "supported": true,
                "version": "0.0.1"
            }
        }
    },
    {
        "currentVersion": "1.5.0",
        "description": "Spark is a fast and general cluster computing system for Big Data",
        "framework": true,
        "name": "spark",
        "supported": false,
        "tags": [
            "bigdata",
            "mapreduce",
            "batch",
            "analytics"
        ],
        "versions": {
            "1.4.0-SNAPSHOT": {
                "index": "0",
                "supported": false,
                "version": "1.4.0-SNAPSHOT"
            },
            "1.4.1": {
                "index": "1",
                "supported": false,
                "version": "1.4.1"
            },
            "1.5.0": {
                "index": "2",
                "supported": false,
                "version": "1.5.0"
            }
        }
    }
];
