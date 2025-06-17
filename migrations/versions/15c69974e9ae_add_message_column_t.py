"""Add message column t

Revision ID: 15c69974e9ae
Revises: f434b9023b3d
Create Date: 2025-06-17 02:31:46.909205

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '15c69974e9ae'
down_revision = 'f434b9023b3d'
branch_labels = None
depends_on = None

def upgrade():
    # Add the column as nullable first
    with op.batch_alter_table('reviews') as batch_op:
        batch_op.add_column(sa.Column('message', sa.String(), nullable=True))

    # Pre-fill existing rows if needed (avoid NULLs)
    op.execute("UPDATE reviews SET message = '' WHERE message IS NULL")

    # Recreate the table with NOT NULL and unique constraint
    with op.batch_alter_table('reviews') as batch_op:
        batch_op.alter_column('message', nullable=False)
        batch_op.create_unique_constraint('uq_reviews_message', ['message'])


    # ### end Alembic commands ###

def downgrade():
    op.drop_constraint('uq_reviews_message', 'reviews', type_='unique')

    with op.batch_alter_table('reviews') as batch_op:
        batch_op.drop_column('message')

