CREATE TABLE "audience" (
	"ud" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link_id" uuid NOT NULL,
	"ip" varchar(15) NOT NULL,
	"region" varchar(255) NOT NULL,
	"browser" varchar(255) NOT NULL,
	"os" varchar(255) NOT NULL,
	"followed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "audience" ADD CONSTRAINT "audience_link_id_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."links"("id") ON DELETE cascade ON UPDATE no action;