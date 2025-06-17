"""remove ratings

Revision ID: 632741abda32
Revises: c87e1b5f65d5
Create Date: 2025-06-16 19:25:06.797658

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '632741abda32'
down_revision = 'c87e1b5f65d5'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('ratings', schema=None) as batch_op:
        batch_op.drop_column('review_id')  # Only drop column, no constraint



    # ### end Alembic commands ###
def downgrade():
    with op.batch_alter_table('ratings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('review_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key('fk_ratings_review_id', 'reviews', ['review_id'], ['id'])


    # ### end Alembic commands ###
