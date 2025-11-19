1. Overview

This document analyzes whether any Elastic-related services will be impacted by the planned Shield Advisor migration to Pega AWS.
Input is based on discussions with SMEs, particularly Annapurna B., as well as our understanding of the current Elastic usage across dependent systems.

2. Summary of Findings
Based on current information, Shield Advisor is not directly connecting to Elasticsearch. All interactions occur through the internal ElasticCommonService (ECS), which remains unchanged. The migration to AWS mainly introduces network path changes, meaning firewall adjustments may be required for AWS-to-ECS communication.

Functionally, no changes are expected to Elasticsearch indices, schemas, or ingestion pipelines. Operational risk is low, with the only notable consideration being potential minor latency due to AWS-to-on-prem routing.

3. Current Architecture (As-Is)
3.1 Shield Advisor → ElasticCommonService → Elasticsearch

Shield Advisor does NOT directly connect to Elasticsearch.

Instead, it calls ElasticCommonService, an internal intermediary service.

ElasticCommonService handles:

Query formatting

Authentication

Routing to ES

Standardized response formatting

3.2 Direct Elastic Connections

SME confirmed:

“I don’t think apart from this they are directly connecting to elasticsearch.”

Only ECS is in scope.

4. Post-Migration Architecture (To-Be)
4.1 Shield Advisor running on AWS Pega infrastructure

Shield Advisor workloads moved to AWS under Pega runtime.

ECS remains where it is today (on-prem / hybrid infra).

Elasticsearch remains unchanged.

4.2 Implications

Network path will change:

AWS → On-Prem (ElasticCommonService) → Elasticsearch

Main item requiring review: firewall rules.

5. Impact Assessment
5.1 Functional Impact

No functional impact expected:

No change to Elastic indices or templates.

No change in ElasticCommonService APIs.

Shield Advisor code does not need modification.

5.2 Performance Impact

Minor latency increase possible due to AWS ↔ On-prem path.

Not expected to be significant.

5.3 Network & Security Impact

SME confirmed:

“There won’t be impact except some firewalls to be added if they are directly connecting to Elastic.”

Actions:

Validate Shield Advisor AWS hosts connectivity to ECS.

Ensure no direct ES calls bypass ECS.

5.4 Operational / Monitoring Impact

No change required for:

Kibana dashboards

Watcher alerts

Logstash pipelines

SQS/Lambda ingestion (if applicable)
