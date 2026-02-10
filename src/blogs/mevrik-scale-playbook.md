---
title: Scaling Mevrik’s AI Customer Experience Platform to 10K+ Concurrent Users
date: 2026-02-10
excerpt: How we kept 99.9% uptime while serving telecom-scale chat traffic with Django, FastAPI, Kafka, and WebSockets.
tags: [mevrik, scalability, architecture, kafka, django, fastapi, websockets]
---

## Context
At **Mevrik DCX** we needed an AI-powered customer experience platform that could handle **10,000+ concurrent users** and **10M+ conversations per month** for large telecom and enterprise clients. The stack had to deliver real-time chat, NLP-driven bots, and multi-tenant onboarding—without sacrificing reliability or cost control.

## Architecture at a Glance
- **Service mix:** Django (orchestration, admin), FastAPI (latency-sensitive APIs), background workers (Celery).
- **Messaging:** **Kafka** for durable, high-throughput event streams; **Redis** for hot-path caching.
- **Transport:** **WebSockets** for sub-150ms bidirectional messaging.
- **Data:** PostgreSQL for relational core; Elasticsearch for search and analytics.
- **Packaging/Deploy:** Dockerized microservices; on-prem + cloud hybrid.
- **Observability:** Prometheus metrics, structured logs, alerting on SLOs.

## Key Decisions (and Why)
1) **Kafka over Redis Pub/Sub** for chat payloads where ordering/durability mattered. Redis remained for cache and low-latency fan-out.
2) **WebSockets for live chat** rather than polling/long-polling to keep P99 latency tight and infra costs down.
3) **Microservice separation by business domain** (conversation, user, billing, analytics) to avoid lock-step deployments.
4) **Docker everywhere** for identical on-prem and cloud builds; reduced “works on my machine” to zero.
5) **SLO-first alerts** (error rate, P99 latency, consumer lag) instead of raw CPU graphs—kept focus on user impact.

## Performance Wins
- **Latency:** API P99 down to ~150ms after isolating FastAPI for interactive paths.
- **Throughput:** Sustained **10K+ concurrent users** with Kafka backpressure instead of request throttling.
- **Uptime:** Held **99.9% availability** by circuit-breaking degraded downstreams.
- **Cost:** Right-sized containers + autoscale policies trimmed idle headroom without risking bursts.

## Operational Playbook
- **Traffic shaping:** Topic-level QoS; slow consumers isolated from critical streams.
- **Schema discipline:** Avro + schema registry to prevent producer/consumer drift.
- **Blue/green for chat gateways:** Zero-downtime deploys for the WebSocket edge.
- **Chaos drills:** Induced consumer lag and broker loss to validate recovery steps.

## Lessons Learned
- Durable messaging pays off the first time a downstream stalls.
- WebSockets are great, but only if you budget for connection churn and heartbeats.
- Multi-tenant features belong in the onboarding pipeline—automate env, topics, creds.
- Observability isn’t a nice-to-have; it’s the only way to ship fast under load.

## Tech Stack Snapshot
`Django · FastAPI · Kafka · WebSockets · PostgreSQL · Redis · Docker · Prometheus`

## If You’re Building Similar
- Start with your SLOs, then pick transport/messaging.
- Keep user-facing paths isolated from batch/analytics.
- Automate tenant provisioning from day one to avoid ops bottlenecks.

Thanks for reading—happy to dive deeper into any section. Reach out if you’re wrestling with real-time chat at scale. 🚀
